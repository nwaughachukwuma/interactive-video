/**
 * A simple logger function when in development
 * 
 * @param message message to log to console
 */

export const Log = (type: string, ...message: any) => {

    if (process.env.NODE_ENV !== 'production') {
        switch(type) {
            case 'log':
                console.log(message);
                break;
            case 'info':
                console.info(message);
                break;
            case 'warn':
                console.warn(message);
                break;
            case 'error':
                console.error(message);
                break;
            default:
                console.log(message)
        }
    }
}