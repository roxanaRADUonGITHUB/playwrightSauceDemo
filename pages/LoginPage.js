import commomActions from "../utils/commonActions";
import { expect } from '@playwright/test';
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
    async getErrorMessage(){
        return await this.actions.getText('h3');
    }
    async assertErrorMessage(recivedMessage){
        const message = await this.getErrorMessage();
        expect(message).toContain(recivedMessage);

    }
}