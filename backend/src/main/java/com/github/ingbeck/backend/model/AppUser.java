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
    private int bmr;
    private int bmrWithActivity;
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
        this.bmr = 0;
        this.bmrWithActivity = 0;
        this.isNewUser = true;
    }

}

enum ActivityLevel
{
    ATHLETE(1.725),
    PUMPER(1.55),
    PEDESTRIAN(1.375),
    COUCHPOTATO(1.2);

    private double level;

    ActivityLevel(double level) {
        this.level = level;
    }

    public double getLevel() {
        return level;
    }
}
