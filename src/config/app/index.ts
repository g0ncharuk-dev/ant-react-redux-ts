const cofigMenu: any = [
    { id: 0, name: "Item ", icon: "dashboard" },
    {
      id: 1,
      name: "Item ",
      icon: "setting",
      subMenu: [
        {
          id: 9,
          name: "Item",
          itemGroup: [
            { id: 5, name: "Item", icon: "star" },
            { id: 6, name: "Item", icon: "heart" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Item",
      icon: "trophy",
      subMenu: [
        {
          id: 7,
          name: "Item",
          icon: "cloud-upload",
          subMenu: [{ id: 8, name: "Item", icon: "radar-chart" }]
        }
      ]
    }
  ];
  
export default cofigMenu;