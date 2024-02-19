import { Box } from "@primer/react";
import { Blankslate as PrimerBlankslate } from "@primer/react/drafts";
import { useEffect, useState } from "react";
import { FetchRPC } from "twirp-ts";
import { BootstrapStatus, Log } from "../shared/api";
import { ApiClientJSON } from "../shared/api.twirp";

interface IgnoreToken {
  ignore: boolean;
}

export function Blankslate() {
  let [logs, setLogs] = useState<Log[]>([]);
  const client = new ApiClientJSON(
    FetchRPC({
      baseUrl: "http://localhost:3000/api",
    }),
  );

  const bootstrap = (ignoreToken: IgnoreToken) => {
    console.log(logs);
    client.Bootstrap({ logOffset: logs.length }).then((response) => {
      if (ignoreToken.ignore) {
        return;
      }
      
      setLogs([...logs, ...response.logs]);

      if (response.status === BootstrapStatus.STATUS_RUNNING) {
        setTimeout(() => {bootstrap(ignoreToken)}, 10000);
      }
    });    
  }

  useEffect(() => {
    const ignoreToken: IgnoreToken = { ignore: false };
    console.log("useEffect");
    bootstrap(ignoreToken);

    return () => {
      ignoreToken.ignore = true;
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PrimerBlankslate>
        <pre>
          <code>
            { logs.map((log) => log.message).join("\n") }
          </code>
        </pre>
      </PrimerBlankslate>
    </Box>
  );
}
