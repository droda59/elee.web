using System;

using CookItNow.Business.Models;

namespace CookItNow.Business
{
    public static class MeasureUnitNameConverter
    {
        public static string Convert(MeasureUnit measureUnit)
        {
            switch (measureUnit)
            {
                case MeasureUnit.Millilitre: return "ml";
                case MeasureUnit.Centilitre: return "cl";
                case MeasureUnit.Decilitre: return "dl";
                case MeasureUnit.Litre: return "l";
                case MeasureUnit.Teaspoon: return "tsp";
                case MeasureUnit.Tablespoon: return "tbsp";
                case MeasureUnit.Ounce: return "oz";
                case MeasureUnit.Cup: return "cups";
                case MeasureUnit.Unit: return "units";
                case MeasureUnit.Pinch: return "pinch";
                case MeasureUnit.Gram: return "g";
                case MeasureUnit.Kilogram: return "kg";
                case MeasureUnit.Pound: return "lbs";
                default: 
                    return string.Empty;
            }
        }
    }
}
