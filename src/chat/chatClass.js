// Reusable Chat component


export class Chat {
    constructor(num) {
        this.id = Date.now();
        this.title = "Chat " + num;
        this.createdAt = formatted_date();
        this.updatedAt = formatted_date();
        this.messages = [];
    }
    addMessage(message) {
        this.messages.push(message);
        this.updatedAt = formatted_date();
    }
    setTitle(title) {
        this.title = title;
    }
    update(date) {
        this.updatedAt = formatted_date();
    }
}

export function formatted_date() {
   var result="";
   var d = new Date();
   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
             " "+ d.getHours()+":"+d.getMinutes()+":"+
             d.getSeconds()+" "+d.getMilliseconds();
   return result;
}