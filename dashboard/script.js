document.addEventListener("DOMContentLoaded", () => {
  const companies = [
    {
      companyName: "Amazon",
      companyId: 114,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/amazon.jpg",
    },
    {
      companyName: "Apple",
      companyId: 78,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/apple.jpg",
    },
    {
      companyName: "Gartner",
      companyId: 605848,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/gartner.jpg",
    },
    {
      companyName: "Infosys",
      companyId: 41,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/infosys.jpg",
    },
    {
      companyName: "Infra.Market",
      companyId: 855479,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/infra-dot-market.jpg",
    },
    {
      companyName: "McKinsey & Company",
      companyId: 153011,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/mckinsey-and-amp-company.jpg",
    },
    {
      companyName: "Nippon Koei India",
      companyId: 21490,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/nippon-koei-india.jpg",
    },
    {
      companyName: "Panasonic",
      companyId: 154252,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/panasonic.jpg",
    },
    {
      companyName: "PolicyBazaar",
      companyId: 153350,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/policybazaar-153350.jpg",
    },
    {
      companyName: "RentoMojo",
      companyId: 154928,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/rentomojo.jpg",
    },
    {
      companyName: "ServiceNow",
      companyId: 118,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/servicenow.jpg",
    },
    {
      companyName: "Sun Pharmaceutical Industries",
      companyId: 243380,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/sun-pharmaceutical-industries.jpg",
    },
    {
      companyName: "Titan Company",
      companyId: 200943,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/titan-company.jpg",
    },
    {
      companyName: "TCS",
      companyId: 42,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/tcs.jpg",
    },
    {
      companyName: "Toyota Kirloskar Motor",
      companyId: 12545,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/toyota-kirloskar-motor.jpg",
    },
    {
      companyName: "UpGrad",
      companyId: 174886,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/upgrad.jpg",
    },
    {
      companyName: "Volkswagen Group Technoloy Solution",
      companyId: 1589316,
      logo: "https://static.ambitionbox.com/alpha/company/photos/logos/volkswagen-group-technology-solution.jpg",
    },
  ];

  const mainMenu = document.getElementById("main-menu");
  const templateApproach = document.getElementById("template-approach");
  const noTemplateApproach = document.getElementById("no-template-approach");
  const backButtons = document.querySelectorAll(".fab-back");

  const templateOption = document.getElementById("template-option");
  const noTemplateOption = document.getElementById("no-template-option");
  const generateTemplateVideo = document.getElementById(
    "generate-template-video"
  );
  const generateCustomVideo = document.getElementById("generate-custom-video");

  const topicDropdown = document.getElementById("topic-dropdown");
  const companySelection = document.getElementById("company-selection");
  const companyDropdown = document.getElementById("company-dropdown");
  const templateSelection = document.getElementById("template-selection");
  const videoTopicInput = document.getElementById("video-topic");
  const notification = document.getElementById("notification");
  const videoOverlay = document.getElementById("videoOverlay");
  const closeButton = document.getElementById("closeButton");
  const video = document.getElementById("video");
  const videoSource = document.getElementById('videoSource');

  let selectedTemplateId = "";

  // Navigate to Template-Based Approach
  templateOption.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    templateApproach.classList.remove("hidden");
  });

  // Navigate to No-Template Approach
  noTemplateOption.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    noTemplateApproach.classList.remove("hidden");
  });

  // Back to Main Menu
  backButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      resetForm();
    })
  );

  // Populate Company Dropdown on Topic Selection
  topicDropdown.addEventListener("change", () => {
    if (topicDropdown.value === "branding") {
      companySelection.classList.remove("hidden");
      populateCompaniesDropdown();
    } else {
      companySelection.classList.add("hidden");
    }
  });

  // Populate Company Dropdown on Topic Selection
  companyDropdown.addEventListener("change", () => {
    templateSelection.classList.remove("hidden");
  });

  function populateCompaniesDropdown() {
    companyDropdown.innerHTML = ""; // Clear existing options
    const option = document.createElement("option");
    option.value = "";
    option.disabled = true;
    option.selected = true;
    option.innerHTML = `Select a option`;
    companyDropdown.appendChild(option);
    companies.forEach((company) => {
      const option = document.createElement("option");
      option.value = company.companyId;
      option.innerHTML = `
        <img src="${company.logo}" alt="${company.companyName}">
        ${company.companyName} - ${company.companyId}
      `;
      companyDropdown.appendChild(option);
    });
  }

  // Handle "Generate Video" for Template-Based Approach
  generateTemplateVideo.addEventListener("click", async () => {
    const selectedTemplate = selectedTemplateId;
    const selectedTopic = topicDropdown.value;
    const selectedCompany = companyDropdown.value;

    const data = {
      approach: "Template-Based",
      template: selectedTemplate,
      topic: selectedTopic,
      company: selectedCompany,
    };

    console.log("Template-Based Video Data:", data);
    try {
      // await fetch(
      //   `http://localhost:3000/employer-branding-video/${selectedCompany}`
      // );
      notification.style.display = "flex"; // show notification

      // Wait 3 seconds, then show the video overlay
      setTimeout(() => {
        notification.style.display = "none"; // hide notification
        videoSource.src = `./assets/videos/${selectedCompany}.mp4`;
        video.load();
        videoOverlay.classList.add("active"); // Show video overlay
        video.currentTime = 0;
        video.play();
      }, 3000);
    } catch (e) {
      console.log(e);
    }
    resetForm();
  });

  // Handle "Generate Video" for No-Template Approach
  generateCustomVideo.addEventListener("click", async () => {
    const enteredTopic = videoTopicInput.value.trim();

    if (!enteredTopic) {
      alert("Please enter a topic for the video.");
      return;
    }

    const data = {
      approach: "No-Template",
      topic: enteredTopic,
    };

    console.log("No-Template Video Data:", data);

    try {
      notification.style.display = "flex"; // show notification
      // Wait 3 seconds, then show the video overlay
      setTimeout(() => {
        notification.style.display = "none"; // hide notification
      }, 3000);

      const response = await fetch(
        `http://127.0.0.1:5000/create-video`,
        {
          method: 'POST', // or 'PUT', 'PATCH', etc., depending on your needs
          headers: {
            'Content-Type': 'application/json', // Set the content type for JSON data
          },
          body: JSON.stringify(data), // Convert the data to a JSON string
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json(); // Assuming the server returns JSON
      console.log('Response:', result);
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
    }
    resetForm();
  });

  // Reset Form
  function resetForm() {
    topicDropdown.value = "";
    companyDropdown.innerHTML = "";
    companySelection.classList.add("hidden");
    templateSelection.classList.add("hidden");
    videoTopicInput.value = "";
    removeTemplateSelection();
    selectedTemplateId = "";
    mainMenu.classList.remove("hidden");
    templateApproach.classList.add("hidden");
    noTemplateApproach.classList.add("hidden");
  }

  function removeTemplateSelection() {
    const allTemplates = document.querySelectorAll(".template-preview");
    allTemplates.forEach((template) => template.classList.remove("selected"));
  }

  const templatePreview = document.getElementsByClassName(
    "template-preview-container"
  )[0];

  templatePreview.addEventListener("click", (event) => {
    if (!event.target.closest(".template-preview")?.id) return;

    removeTemplateSelection();

    event.target.closest(".template-preview")?.classList.toggle("highlight");

    // Add selected class to the clicked template
    const selectedTemplate = event.target.closest(".template-preview");
    selectedTemplateId = selectedTemplate?.id;
    selectedTemplate?.classList.add("selected");

    // You can store the templateId for backend processing
    console.log("Selected Template:", selectedTemplateId);
  });

  // Close video overlay on clicking the close button
  closeButton.addEventListener("click", () => {
    video.pause(); // Pause the video
    videoOverlay.classList.remove("active");
  });
});
