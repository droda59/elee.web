using CookItNow.Business;

namespace CookItNow.Parser.LanguageUtilities
{
    internal interface IMeasureUnitDetector
    {
        MeasureUnit GetMeasureUnit(string measureUnit);
    }
}