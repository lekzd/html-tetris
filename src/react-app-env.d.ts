/// <reference types="react-scripts" />

module '*.frag' {
  const module: string;

  export default module;
}

module '*.vert' {
  const module: string;

  export default module;
}

declare module 'qr-encoder' {
  const module: {
    encode: (str: string, version: number) => number[][];
  };

  export default module;
}

declare module 'figlet' {
  const module: any;

  export default module;
}
