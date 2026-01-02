import React from 'react';

function CodeBlock({ code }: {code: string}) {
    return (
        <pre>
            <code>{code}</code>
        </pre>
    );
}

export { CodeBlock };
