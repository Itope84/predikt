import React from "react"
type FileInputProps = {
    onChange: (value: FileList | null) => void
    children: React.ReactElement
    id: string
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'accept' | 'multiple'>

/**
 * A component that wraps any provided child around a visually hidden file input element
 */
const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ onChange, children, multiple = true, id, ...inputProps }, inputRef) => {
    if (!inputRef) throw new Error('ref is required')

    /**
     * We can modify the label button here directly and force change its onChange property as shown below. Alternatively we can create a hook that provides an onClick function that can be called by the button itself. That approach is more "functional" than  this
     */
    // enforce a single child:
    const child = React.Children.only(children)
    const trigger = React.cloneElement(child, {
        onClick: () => {
            'current' in inputRef && inputRef.current?.click()
        }
    })

    return (
        <>
            <label htmlFor={id}>{trigger}</label>
            <div className="sr-only">
                {/* Tabindex is -1 because the label has to receive the visual focus. Hence label must be focusable */}
                <input ref={inputRef} type='file' tabIndex={-1} id={id} multiple={multiple} onChange={e => onChange(e.target.files)} {...inputProps} />
            </div>
        </>
    )
})

export default FileInput