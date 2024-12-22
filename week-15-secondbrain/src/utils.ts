export function random(len: number) {
    let options= "qiwuerhiejhrwojonconqwe9781297onjmcnmqdj08183924ikncmkanmd1297931821";
    let length = options.length;

    let ans = "";

    for(let i=0; i<len; i++) {
        ans += options[Math.floor((Math.random() * length))]
    }

    return ans;
}