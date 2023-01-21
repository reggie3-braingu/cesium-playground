const getQueryString = (params = {} as Record<string, string>): string => {
    return Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
}

export default getQueryString
