import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    birthday: Yup.date()
        .typeError("Bitte Geburtsdatum angeben")
        .max(new Date(Date.now() - 567648000000), "Du musst mindestens 18 Jahre alt sein")
        .required("Required"),
    gender: Yup.mixed()
        .oneOf(["MALE", "FEMALE"], "Bitte Geschlecht auswählen")
        .required(),
    height: Yup.number()
        .positive("Bitte Größe angeben")
        .typeError("Bitte Größe in cm angeben")
        .max(220, "Bist du wirklich so groß?")
        .required(),
    weight: Yup.number()
        .positive("Bitte Gewicht angeben")
        .typeError("Bitte Gewicht in kg angeben")
        .max(999, "Bist du wirklich so schwer?")
        .required(),
    activityLevel: Yup.mixed()
        .oneOf(["ATHLETE", "PUMPER", "PEDESTRIAN", "COUCHPOTATO"], "Bitte Aktivitätslevel auswählen")
        .required()
});