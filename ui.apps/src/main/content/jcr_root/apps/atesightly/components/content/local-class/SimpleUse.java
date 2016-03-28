package apps.atesightly.components.content.local_class;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.dam.api.Asset;
import com.day.cq.tagging.TagManager;
import com.day.cq.tagging.Tag;
import org.apache.sling.api.resource.Resource;
import java.util.*;

public class SimpleUse extends WCMUsePojo {
    private String lowerCaseTitle;
    private String lowerCaseDescription;
    private String assetPath;
    List<String> tags;
    
    @Override
    public void activate() throws Exception {
        String path = getProperties().get("assetpath", "sss");
        if(path.length()>0) {
            this.assetPath = path;
            
        }
    }
 
    public List<String> getTag() {

        Resource resource = getRequest().getResourceResolver().getResource(this.assetPath);
        Asset asset = resource.adaptTo(Asset.class);
        this.tags = new ArrayList<String>();
        Object[] titleArray = null;
        Object titleObj = asset.getMetadata("cq:tags");
        if (titleObj instanceof Object[]) {
            titleArray = (Object[]) titleObj;
        } 
        
        for (Object ob : titleArray) {
            
            String a = ob.toString();
            TagManager tagManager = null;
            tagManager = getRequest().getResourceResolver().adaptTo(
                TagManager.class);
            Tag custTag = tagManager.resolve(a);
            this.tags.add(custTag.getTitle());
            
        }
        
        return this.tags;
    }
}