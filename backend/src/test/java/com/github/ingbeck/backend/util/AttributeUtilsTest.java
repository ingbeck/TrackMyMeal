package com.github.ingbeck.backend.util;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static com.github.ingbeck.backend.util.AttributeUtils.getStringAttribute;
import static org.junit.jupiter.api.Assertions.*;

class AttributeUtilsTest {

    @Test
    void testGetStringAttribute() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", "Max Mustermann");

        String result = getStringAttribute(attributes, "name");

        assertEquals("Max Mustermann", result);
    }
    @Test
    void testGetStringAttributeWithMissingAttribute() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", "Max Mustermann");

        assertThrows(IllegalArgumentException.class, () -> getStringAttribute(attributes, "missingAttribute"));
    }

}