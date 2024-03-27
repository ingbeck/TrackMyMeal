package com.github.ingbeck.backend.model;

public enum ActivityLevel
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
