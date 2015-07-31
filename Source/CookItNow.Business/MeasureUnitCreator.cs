using System;

namespace CookItNow.Business
{
    // TODO Put this in dependency based on language
    public static class MeasureUnitCreator
    {
        public static MeasureUnit GetMeasureUnit(string measureUnit, string language)
        {
            switch (language)
            {
                case "fr":
                    return GetFromFrenchMeasureUnits(measureUnit);
                case "en":
                    return GetFromEnglishMeasureUnits(measureUnit);
            }

            return MeasureUnit.Unit;
        }

        private static MeasureUnit GetFromEnglishMeasureUnits(string measureUnit)
        {
            switch (measureUnit)
            {
                case "ml": return MeasureUnit.Millilitre;
                case "cl": return MeasureUnit.Centilitre;
                case "dl": return MeasureUnit.Decilitre;
                case "l": return MeasureUnit.Litre;

                case "teaspoon":
                case "tsp": return MeasureUnit.Teaspoon;

                case "tablespoon":
                case "tbsp": return MeasureUnit.Tablespoon;

                case "oz":
                case "ounce":
                case "ounces": return MeasureUnit.Ounce;

                case "cup":
                case "cups": return MeasureUnit.Cup;

                case "g": return MeasureUnit.Gram;
                case "kg": return MeasureUnit.Kilogram;

                case "pound":
                case "pounds":
                case "lb":
                case "lbs": return MeasureUnit.Pound;

                case "pinch": return MeasureUnit.Pinch;

                default: return MeasureUnit.Unit;
            }
        }

        private static MeasureUnit GetFromFrenchMeasureUnits(string measureUnit)
        {
            switch (measureUnit)
            {
                case "ml": return MeasureUnit.Millilitre;
                case "cl": return MeasureUnit.Centilitre;
                case "dl": return MeasureUnit.Decilitre;
                case "l": return MeasureUnit.Litre;

                case "c. à thé":
                case "tsp": return MeasureUnit.Teaspoon;

                case "c. à table":
                case "c. à café":
                case "tbsp": return MeasureUnit.Tablespoon;

                case "once":
                case "onces": return MeasureUnit.Ounce;

                case "tasse":
                case "tasses": return MeasureUnit.Cup;

                case "g": return MeasureUnit.Gram;
                case "kg": return MeasureUnit.Kilogram;

                case "livre":
                case "livres":
                case "lb":
                case "lbs": return MeasureUnit.Pound;

                case "pincée":
                case "pincées": return MeasureUnit.Pinch;

                default: return MeasureUnit.Unit;
            }
        }
    }
}
