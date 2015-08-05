using System;
using System.Collections.Generic;

namespace CookItNow.Business.Models
{
    public class Step  
    {
        public Step()
        {
            this.Phrases = new List<Phrase>();
        }

        public int? SubrecipeId { get; set; }

        public IList<Phrase> Phrases { get; set; }

        public Step PostStep { get; set; }
    }
}