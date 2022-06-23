import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';

function CodeBlock({ code }: {code: string}) {
    return (
        <CopyBlock
            language="jsx"
            text={code}
            showLineNumbers
            theme={dracula}
            wrapLines={true}
            codeBlock
        />
    );
}

export { CodeBlock };