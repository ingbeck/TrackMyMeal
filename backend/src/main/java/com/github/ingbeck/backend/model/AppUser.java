package com.github.ingbeck.backend.model;

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
    private int age;
    private String avatarUrl;
    private AppUserGender gender;
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
        this.age = 0;
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

