interface DocumentProps {
  documentName: string;
}
export const Document = ({ documentName }: DocumentProps) => (
  <div>{documentName}</div>
);
