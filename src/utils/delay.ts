export async function delay(ms: number = 1000) {
    return await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
