package com.github.ingbeck.backend.model;

import com.nimbusds.openid.connect.sdk.claims.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import static com.github.ingbeck.backend.util.AttributeUtils.getStringAttribute;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("users")
public class AppUser {
    private String id;
    private String name;
    private String birthdate;
    private String avatarUrl;
    private Gender gender;
    private int height;
    private int weight;
    private ActivityLevel activityLevel;
    private boolean isNewUser;

    public AppUser(Map<String, Object> attributes){
        this.id = getStringAttribute(attributes, "sub");
        this.name = getStringAttribute(attributes, "name");
        this.birthdate = "";
        this.avatarUrl = getStringAttribute(attributes, "picture");
        this.gender = null;
        this.height = 0;
        this.weight = 0;
        this.activityLevel = null;
        this.isNewUser = true;
    }

}

enum ActivityLevel
{
    ATHLETE(4),
    PUMPER(3),
    PEDESTRIAN(2),
    COUCHPOTATO(1);

    private int level;

    ActivityLevel(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}
