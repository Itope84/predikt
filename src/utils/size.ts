export const readableSize = (size: number) => {
    const isMb = size > (1024 * 1024)
    return `${(isMb ? size / (1024 * 1024) : size / 1024).toFixed(2)} ${isMb ? 'Mb' : 'Kb'}`
}