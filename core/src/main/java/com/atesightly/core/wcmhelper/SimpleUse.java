package com.atesightly.core.wcmhelper;

import com.adobe.cq.sightly.WCMUsePojo;

public class SimpleUse extends WCMUsePojo {
    private String reversedText;   
     
    @Override
    public void activate() throws Exception {
        String text = get("text", String.class);      
        reversedText = new StringBuilder(text).reverse().toString();
     }
  
    public String getReversedText() {
        return reversedText;
    }
}