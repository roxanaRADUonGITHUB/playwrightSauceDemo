import commomActions from "../utils/commonActions";
export default class LoginPage {
    constructor (page){
    this.actions = new commomActions(page);
    }
    async navigate(){
        await this.actions.navigate('https://www.saucedemo.com/');
    }
    async login(username, password){
    
        await this.actions.fill('#user-name', username);
        await this.actions.fill('#password', password);
        await this.actions.click('#login-button');
    }
}