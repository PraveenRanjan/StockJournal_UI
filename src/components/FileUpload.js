import react from 'react';
import { DropzoneArea } from "mui-file-dropzone";
import { uploadFile } from "../api"

export default function FileUpload(props) {
  const { userId } = props;
  const handleFileChange = (files) => {
    if (files.length) {
      uploadFile(userId, files[0]);
    }

  }

  return (
    <DropzoneArea onChange={handleFileChange} filesLimit={1} />
  );
}