import { Box } from "@primer/react";
import { Blankslate as PrimerBlankslate } from "@primer/react/drafts";
import { useEffect, useState } from "react";
import { FetchRPC } from "twirp-ts";
import { BootstrapStatus, Log } from "../shared/api";
import { ApiClientJSON } from "../shared/api.twirp";

export function Blankslate() {
  let [logOffset, setLogOffset] = useState(0);
  let [logs, setLogs] = useState<Log[]>([]);
  const client = new ApiClientJSON(
    FetchRPC({
      baseUrl: "http://localhost:3000/api",
    }),
  );

  const bootstrap = () => {
    client.Bootstrap({ logOffset: logs.length }).then((response) => {
      setLogs([...logs, ...response.logs]);

      if (response.status === BootstrapStatus.STATUS_RUNNING) {
        setTimeout(bootstrap, 10000);
      }
    });    
  }

  useEffect(() => {
    bootstrap();
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
