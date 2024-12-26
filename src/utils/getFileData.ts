interface FileData {
  key: string;
  name?: string;
  size?: number;
  path?: string; // Optional, for cases where path might exist (e.g., Node.js)
  type?: string;
  preview: string;
  lastModified?: number; // Use lastModified (timestamp)
  lastModifiedDate?: Date; // This can be derived from lastModified if needed
}

interface FileWithPreview extends File {
  preview: string;
  path?: string; // Optional, for cases where path might exist (e.g., Node.js)
}

export default function getFileData(file: string | FileWithPreview, index?: number): FileData {
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    };
  }

  // Derive lastModifiedDate from lastModified if needed
  const lastModifiedDate = file.lastModified ? new Date(file.lastModified) : undefined;

  return {
    key: index ? `${file.name}-${index}` : file.name,
    name: file.name,
    size: file.size,
    path: file.path, // Optional
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate, // Optional derived value
  };
}
