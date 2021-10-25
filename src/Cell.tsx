import React from "react"

export const Cell = React.memo(({ value }: { value: 0 | 1 }) => <div style={{ background: value ? 'black' : 'white' }}></div>)