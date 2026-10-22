import type { ArtifactBlock } from '../../types';
import { DataTable } from '../qa/DataTable';
import { CodeBlock } from '../qa/CodeBlock';

export function ArtifactBlocks({ blocks }: { blocks: ArtifactBlock[] }) {
  return (
    <div className="artifact-blocks">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case 'paragraph':
            return <p key={key} className="artifact-paragraph">{block.text}</p>;
          case 'list':
            return (
              <section key={key} className="artifact-list">
                {block.title ? <h3>{block.title}</h3> : null}
                <ul>
                  {block.items.map((item) => (
                    <li key={item}><span aria-hidden="true">↳</span>{item}</li>
                  ))}
                </ul>
              </section>
            );
          case 'table':
            return (
              <DataTable
                key={key}
                columns={block.table.columns}
                rows={block.table.rows}
                caption={block.table.title ?? block.table.caption ?? 'Artifact table'}
              />
            );
          case 'code':
            return <CodeBlock key={key} title={block.title} language={block.language} code={block.code} />;
          case 'fields':
            return (
              <section key={key} className="artifact-fields">
                {block.title ? <h3>{block.title}</h3> : null}
                <dl>
                  {block.fields.map((field) => (
                    <div key={`${field.label}-${field.value}`}>
                      <dt>{field.label}</dt>
                      <dd>{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          case 'callout':
            return (
              <aside key={key} className="artifact-callout">
                <span className="mono-label">{block.label}</span>
                <p>{block.text}</p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
