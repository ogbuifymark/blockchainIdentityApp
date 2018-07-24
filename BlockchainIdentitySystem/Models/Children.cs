using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlockchainIdentitySystem.Models
{
    public class Children
    {
        public int id { get; set; }
        public string name { get; set; }
        public string charityHome { get; set; }
        public string gender { get; set; }
        public string picture { get; set; }
        public int sponsored { get; set;}
        public int NotimeSponsored { get; set; }
        public SchoolInfo schoolInfo { get; set; }
        public HealthInfo healthInfo { get; set; }
        public HandlerInfo handlerInfo { get; set; }
        public FamilyInfo familyInfo { get; set; }

    }
}