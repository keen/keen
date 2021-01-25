const download = (content: any, fileName: string, fileType: string) => {
  const a = document.createElement('a');
  const mimeType = fileType || 'application/octet-stream';

  if (navigator.msSaveBlob) {
    // IE10 Support
    navigator.msSaveBlob(
      new Blob([content], {
        type: mimeType,
      }),
      fileName
    );
  } else if (URL && 'download' in a) {
    // HTML5
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    );
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href =
      'data:application/octet-stream,' + encodeURIComponent(content);
  }
};

export default download;
