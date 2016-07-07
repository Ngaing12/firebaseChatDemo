package com.chat.firebase.irahavoi.firebasechat;

/**
 * Created by irahavoi on 2016-05-31.
 */
public class Message {
    String author;
    String message;

    public Message(){}

    public Message(String author, String message) {
        this.author = author;
        this.message = message;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
