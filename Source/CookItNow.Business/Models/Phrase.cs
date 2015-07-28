using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class Phrase
    {
        public Phrase()
        {
            this.Parts = new List<Part>();
        }

        public IList<Part> Parts { get; set; } 
    }
}