import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const FilePondImageUploader = () => {
  return (
    <FilePond
      allowMultiple={true}
      maxFiles={3}
    //   server="/api/upload"
    acceptedFileTypes={['image/png', 'image/jpeg']}
      name="files"
      labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
    />
  );
};

export default FilePondImageUploader;

// npm install filepond react-filepond filepond-plugin-image-preview

