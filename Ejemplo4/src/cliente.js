

const traerPostCerveza = async () =>{
    try {
        const response= await fetch("http://192.168.70.134:4000/beer");
        const data= await response.json();
        console.log(data);    
    } catch (error) {
    }
    
}
traerPostCerveza();
