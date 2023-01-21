export type ListEventTspiEntityRunsApiResponse =
  /** status 200  */ EventTspiEntityRun[];
export type ListEventEmitterSitesApiResponse =
  /** status 200  */ EventEmitterSite[];
export type ListEventTestRunsApiResponse = /** status 200  */ EventTestRun[];
export type ListEventBoundariesApiResponse = /** status 200  */ EventBoundary[];

export type EventTspiEntityRun = {
  id?: string;
  event: string;
  tspientityrun?: {
    id?: string;
    entity_id?: string;
    tspi_source?:
      | "ARDS"
      | "GAINR"
      | "GAINR-II"
      | "GAINR-Lite"
      | "INS"
      | "Mode3"
      | "TECCS"
      | "ADSB"
      | "Mensurated Coordinates";
    czmlpath?: string | null;
    filename?: string | null;
    date: string;
    entity?: {
      id?: string;
      name?: string | null;
      type?: {
        id?: string;
        name: string;
        category?: "Static" | "Dynamic";
        domain?: "Air" | "Land" | "Sea" | "Space" | "Subsurface" | "Cyber";
        data?: Record<string, any>;
      };
    };
  };
  czml_url?: string;
};

export type EventBoundary = {
  id?: string;
  event: string;
  boundary?: {
    id?: string;
    name: string;
    code: string;
  };
  kml_url?: string;
};

export type EventEmitterSite = {
  id?: string;
  event_id?: string;
  callsign: string;
  date: string;
  czmlpath?: string | null;
  czml_url?: string;
  filename?: string | null;
  emittersites?: {
    id?: string;
    entity_id?: string;
    mnemonic?: string;
    latitude: number;
    longitude: number;
    alt_msl: number;
  };
  intervals?: Record<string, any> | null;
};
export type EventTestRun = {
  id?: string;
  name: string;
  event: string;
  data?: {
    map_rectangle?: {
      west?: number;
      south?: number;
      east?: number;
      north?: number;
    };
  };
  start_date_time: string;
  end_date_time: string;
};
