import { Dir, writeFile } from "@tauri-apps/api/fs";

const useFile = () => {
  // might need to check for file with this name first?
  // maybe create a uuid to attach to file names
  return ({ contents, path, dir = Dir.LocalData }) => {
    return writeFile({ contents, path }, { dir });
  };
};

export default useFile;
