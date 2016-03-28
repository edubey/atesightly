package apps.atesightly.components.content.aemclub;

import com.adobe.cq.sightly.WCMUsePojo;

public class Aemclub extends WCMUsePojo {
    private String lowerCaseTitle;
    private String lowerCaseDescription;
  
    @Override
    public void activate() throws Exception {
        lowerCaseTitle = getProperties().get("text", "").toLowerCase();
    }
  
    public String getLowerCaseTitle() {
        return lowerCaseTitle;
    }
  
    public String getLowerCaseDescription() {
        return lowerCaseDescription;
    }
}