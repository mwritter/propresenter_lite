import { readDir, createDir, Dir } from "@tauri-apps/api/fs";

const useDirectory = async (
  directory,
  dir = Dir.LocalData,
  recursive = true
) => {
  let dirData = null;
  // see if we can read the base/directory
  try {
    dirData = await readDir(directory, {
      dir,
      recursive,
    });
  } catch (err) {
    // if we cant read the directory we need to create it
    try {
      dirData = await createDir(directory, {
        dir,
        recursive,
      });
    } catch (err) {
      // maybe do some logging here
      console.log(err);
    }
  }
  return dirData;
};

export default useDirectory;
