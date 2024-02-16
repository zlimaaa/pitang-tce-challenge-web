export class Config {
    constructor(
        public production_url = " https://pitang-tce-api-51bcd86fe773.herokuapp.com/api/",
        public development_url = "http://localhost:8080/api/",

        private isProduction  = true,   
    ){}

    apiPath(resource: string): string{
        if(this.isProduction){
            return this.production_url + resource;
        }else{
            return this.development_url + resource;
        }
    }
}