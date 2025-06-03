export const random = (len:number):string =>{
    let options:string = "dfasjklfatiorwetufbkvkasjhdfasdhfioewhvhjksasajflksd";
    let length:number = options.length;
    let ans:string="";
    for (let i = 0; i <len; i++) {
        ans += options[Math.floor((Math.random()*length))];
    }
    return ans;
}