export const siteData = {
  membershipPlans: [
    {
      id: "monthly",
      name: "1 Month",
      label: "",
      duration: "1 Month",
      monthlyPrice: 2999,
      totalPrice: 2999,
      bonusMonths: 0,
      benefits: [
        "BMI — 2 times monthly",
        "Body Fitness Test",
        "Workout Schedule Card"
      ]
    },
    {
      id: "quarterly",
      name: "3 Months",
      label: "Quarterly",
      duration: "3 Months",
      monthlyPrice: 1999,
      totalPrice: 5997,
      bonusMonths: 0,
      benefits: [
        "Personal Training",
        "Body Fitness Test",
        "Body Assessment",
        "Workout Schedule Card"
      ]
    },
    {
      id: "half-yearly",
      name: "6 Months",
      label: "Half-Yearly",
      duration: "6 Months",
      monthlyPrice: 1333,
      totalPrice: 7998,
      bonusMonths: 0,
      benefits: [
        "Personal Training",
        "Body Fitness Test",
        "Body Assessment",
        "BCA Test — Every 2 Months",
        "Workout Schedule Card",
        "Diet Plan"
      ]
    },
    {
      id: "yearly",
      name: "12 + 2 Months",
      label: "Yearly",
      duration: "12 Months",
      monthlyPrice: 833,
      paidMonths: 12,
      bonusMonths: 2,
      displayMonthlyPrice: 833,
      benefits: [
        "Personal Training",
        "Body Fitness Test",
        "Body Assessment",
        "BCA Test — Every 2 Months",
        "Workout Schedule Card",
        "Diet Plan",
        "Extra Group Class",
        "Extra 2 Months"
      ]
    }
  ],
  addons: [
    {
      title: "BCA REPORT",
      description: "Every 2 Months"
    },
    {
      title: "DIET CHART PLAN",
      description: "Customized Nutrition"
    }
  ],
  services: [
    {
      id: "01",
      title: "CARDIO WORKOUT",
      description: "Burn Calories, Boost Stamina",
      video: "/assets/videos/battle-rope.webm"
    },
    {
      id: "02",
      title: "STRENGTH TRAINING",
      description: "Build Muscle, Gain Power",
      video: "/assets/videos/deadlift.webm"
    },
    {
      id: "03",
      title: "GENERAL TRAINING",
      description: "Improve Fitness, Stay Healthy",
      video: "/assets/videos/kettlebell.webm"
    },
    {
      id: "04",
      title: "PERSONAL TRAINING",
      description: "Custom Guidance, Faster Results",
      video: "/assets/videos/personal-training.webm"
    },
    {
      id: "05",
      title: "BODY ASSESSMENT",
      description: "Know Your Progress",
      video: "/assets/videos/body-assessment.webm" 
    },
    {
      id: "06",
      title: "BCA TEST",
      description: "Track Your Body Composition",
      video: "/assets/videos/bca-test.webm" 
    },
    {
      id: "07",
      title: "WORKOUT SCHEDULE",
      description: "Plan. Train. Achieve.",
      video: "/assets/videos/workout-schedule.webm" 
    },
    {
      id: "08",
      title: "DIET PLAN",
      description: "Eat Right, Live Better",
      video: "/assets/videos/diet-plan.webm" 
    },
    {
      id: "09",
      title: "CERTIFIED TRAINERS",
      description: "Expertise You Can Trust",
      video: "/assets/videos/certified-trainers.webm" 
    }
  ],
  bca: {
    metrics: [
      { label: "BODY WEIGHT", value: "68.5", unit: "kg" },
      { label: "BODY FAT", value: "18.4", unit: "%" },
      { label: "MUSCLE MASS", value: "52.3", unit: "kg" },
      { label: "BODY WATER", value: "55.2", unit: "%" },
      { label: "BONE MASS", value: "2.9", unit: "kg" },
      { label: "BMR", value: "1640", unit: "kcal" },
      { label: "VISCERAL FAT", value: "7.0", unit: "lvl" }
    ]
  },
  nutrition: {
    goals: [
      {
        id: "weight-loss",
        title: "WEIGHT LOSS",
        phases: [
          { time: "MORNING", plan: "High protein, low carb start to ignite metabolism." },
          { time: "AFTERNOON", plan: "Lean proteins and fibrous greens for sustained energy." },
          { time: "EVENING", plan: "Light, easily digestible nutrients to optimize recovery." }
        ]
      },
      {
        id: "weight-gain",
        title: "WEIGHT GAIN",
        phases: [
          { time: "MORNING", plan: "Caloric surplus with complex carbs and whey." },
          { time: "AFTERNOON", plan: "Dense macros to support heavy lifting sessions." },
          { time: "EVENING", plan: "Casein protein and healthy fats for overnight repair." }
        ]
      }
    ]
  }
};
