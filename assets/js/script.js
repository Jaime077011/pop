$(function () {
    "use strict";
    let userType = ""; // Variable to store the user's selection

    // ========== Form-select-option ========== //
    $(".step_1, .step_7, .step_8, .step_9, .step_10, .step_11, .step_12, .step_13, .step_14, .step_15, .step_16").on('click', function () {
        let className = $(this).attr('class').split(' ')[0]; 
        $("." + className).removeClass("active");
        $(this).addClass("active");
    });

    $('.step_2, .step_3, .step_4, .step_5, .step_6').on('change', function(e) {
        e.stopPropagation();
        if($(this).hasClass('active')) {
          $(this).removeClass("active");
        } else if( !$(this).hasClass('active') ) {
          $(this).addClass("active");
        }
      });

    // =====================Progress Increment====================
    $(document).on('click', '#nextBtn', function () {
        var $progressbar = $('.count_progress');
        for (var i = 1; i < 4; i++) {
            var className = 'clip-' + i;
            if ($progressbar.hasClass(className)) {
                $progressbar.removeClass(className).addClass('clip-' + (i + 1));
                break;
            }
        }
    });

    // =====================Progress Decrement====================
    $(document).on('click', '#prevBtn', function () {
        var $progressbar = $('.count_progress');
        for (var i = 1; i < 4; i++) {
            var className = 'clip-' + i;
            if ($progressbar.hasClass(className)) {
                $progressbar.removeClass(className).addClass('clip-' + (i + 1));
                break;
            }
        }
    });


    // Progress bar counter ======================
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const obj = document.getElementById("value");
    if (obj) { // Check if the element exists
        animateValue(obj, 100, 0, 90000);
    }

    // Multi-step form logic
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab


    const stepProductPoints = {
        2: {
            "rich_bold":  { N89: 1},
            "smooth_creamy":     { N90: 1 },
            "light_crisp":     { N87: 1, N88: 1 },
        },
        3: {
            "sweet_fruity":         { N87: 1 },
            "floral_cutis":       { N90: 1},
            "nutty_chocolatey":       { N89: 1},
        },
        4: {
            "honey":         { N87: 1 },
            "fruit":       { N88: 1},
            "balanced":       { N89: 1, N90: 1},
        },
        5: {
            "morning":         { N87: 1},
            "afternoon":       { N88: 1},
            "evening":       { N89: 1, N90: 1},
        },
        6: {
            "black":         { N90: 1},
            "milk":       { N89: 1},
            "espresso":       { N87: 1, N88: 1},
        },

        };
        
    // Define Product Mapping
    // const productMapping = {
    //     customer: [
    //         { min: 5, max: 9, products: ["N87", "N88"] },
    //         { min: 10, max: 14, products: ["N88", "N89"] },
    //         { min: 15, max: 19, products: ["N89", "N88"] },
    //         { min: 20, max: 24, products: ["N90", "N89"] }
    //     ],
    //     shop: [
    //         { min: 5, max: 9, products: ["N87", "N88"] },
    //         { min: 10, max: 14, products: ["N88", "N89"] },
    //         { min: 15, max: 19, products: ["N89", "N88"] },
    //         { min: 20, max: 24, products: ["N90", "N89"] }
    //     ],
    //     company: [
    //         { min: 5, max: 9, products: ["N87", "N88"] },
    //         { min: 10, max: 14, products: ["N88", "N89"] },
    //         { min: 15, max: 19, products: ["N89", "N88"] },
    //         { min: 20, max: 24, products: ["N90", "N89"] }
    //     ]
    // };

    // Generalized validation function
    // function validateStep(stepIndex) {
    //     var radioName = 'stp_' + stepIndex + '_select_option';
    //     var selectedOption = $('input[name="' + radioName + '"]:checked').val();
    //     var validationDiv = $('#validation-step' + stepIndex);

    //     if (!selectedOption) {
    //         validationDiv.text('Please select an option before proceeding.').show();

    //         $('#step-' + stepIndex).addClass('error');

    //         $('html, body').animate({
    //             scrollTop: validationDiv.closest('.form_items').offset().top - 100
    //         }, 500);

    //         return false; // Validation failed
    //     } else {
    //         validationDiv.hide();
    //         $('#step-' + stepIndex).removeClass('error');
    //         return true; // Validation passed
    //     }
    // }

    function validateStep(stepIndex) {
        const inputName = 'stp_' + stepIndex + '_select_option';
        const checkedBoxes = $('input[name="' + inputName + '"]:checked');
        const validationDiv = $('#validation-step' + stepIndex);
    
        if (checkedBoxes.length === 0) {
            validationDiv.text('Please select at least one option.').show();
            $('#step-' + stepIndex).addClass('error');
            // scroll, etc.
            return false;
        } else {
            validationDiv.hide();
            $('#step-' + stepIndex).removeClass('error');
            return true;
        }
    }
    

    function calculateResult() {
        // 1) Initialize product scores
        let productPoints = {
            N87: 0,
            N88: 0,
            N89: 0,
            N90: 0
            // Add more if needed
        };
    
        // 2) Define which steps to gather, same as before
        let relevantSteps = [];
        if (userType === "customer") {
            relevantSteps = [2, 3, 4, 5, 6];
        } else if (userType === "shop") {
            relevantSteps = [7, 8, 9, 10, 11];
        } else if (userType === "company") {
            relevantSteps = [12, 13, 14, 15, 16];
        }
    
        console.log("User Type:", userType);
        console.log("Relevant Steps:", relevantSteps);
    
        // 3) For each relevant step, gather all checked inputs (or single radio if it’s still radio)
        relevantSteps.forEach(step => {
            // e.g. name="stp_2_select_option"
            const inputName = 'stp_' + step + '_select_option';
            // All checked (if radio, it’ll be only one)
            const selectedInputs = document.querySelectorAll('input[name="' + inputName + '"]:checked');
            
            // For each selected answer, increment the product points
            selectedInputs.forEach(input => {
                const answerValue = input.value; 
                console.log(`Step ${step}, Answer: ${answerValue}`);
    
                // Look up what products this answer affects, if we defined it in stepProductPoints
                if (stepProductPoints[step] && stepProductPoints[step][answerValue]) {
                    const increments = stepProductPoints[step][answerValue];
                    // increments = { N87:1, N88:1 } or similar
                    for (let productCode in increments) {
                        productPoints[productCode] += increments[productCode];
                    }
                } else {
                    console.warn(`No mapping found for step ${step}, answer "${answerValue}"`);
                }
            });
        });
    
        console.log("Final Product Points:", productPoints);
    
        // 4) Sort products by total points (descending)
        //    e.g. [["N88", 4], ["N87", 2], ["N89",1], ...]
        let sortedProducts = Object.entries(productPoints).sort((a,b) => b[1] - a[1]);
    
        // 5) Identify the top two
        let firstProduct = sortedProducts[0] ? sortedProducts[0][0] : null;
        let secondProduct = sortedProducts[1] ? sortedProducts[1][0] : null;
    
        // 6) Display results
        if (sortedProducts.length > 0 && sortedProducts[0][1] > 0) {
            // If the top product has at least 1 point
            $('#result').html(
                "<strong>Your Selections Added Points to:</strong> " + JSON.stringify(productPoints)
            );
    
            if (firstProduct) {
                $('#result-1').html(firstProduct);
            } else {
                $('#result-1').html("No product found.");
            }
    
            if (secondProduct) {
                $('#result-2').html(secondProduct);
            } else {
                $('#result-2').html("No second product found.");
            }
        } else {
            // No product got any points
            $('#result').html(
                "<strong>No products match your selections.</strong>"
            );
            $('#result-1').html("");
            $('#result-2').html("");
        }
    }
    

    // Updated nextPrev function with generalized validation and userType assignment
    function nextPrev(n) {
        const tabs = document.getElementsByClassName("multisteps_form_panel");

        // Current step index (1-based for readability)
        const currentStep = currentTab + 1;

        // Validate the current step before proceeding to the next
        if (n === 1) { // Only validate when moving forward
            var isValid = validateStep(currentStep);
            if (!isValid) {
                return; // Stop navigation if validation fails
            }

            // **Capture `userType` after successful validation on Step 1**
            if (currentStep === 1) {
                userType = $('input[name="stp_1_select_option"]:checked').val();
                console.log("User Type Selected:", userType); // Debugging
            }
        }

        // Hide the current tab
        tabs[currentTab].style.display = "none";

        // Handle Back Button
        if (n === -1 && handleBackButton()) {
            return; // Exit if redirected to Step 1
        }

        // Determine the next tab based on `userType` and current step
        if (currentStep === 1 && n === 1) {
            if (userType === "shop") {
                currentTab = 6; // Go to Step 7 for Coffee Shop
            } else if (userType === "company") {
                currentTab = 11; // Go to Step 12 for Company
            } else {
                currentTab = 1; // Go to Step 2 for Customer
            }
        } else {
            currentTab += n; // Move to the next or previous tab
        }

        // Ensure valid navigation ranges
        if (userType === "customer") {
            if (currentTab < 1) currentTab = 1; // Restrict Customer to Steps 2–6
            if (currentTab > 6) currentTab = 6; // Customer's last step is Step 6
        }

        if (userType === "shop") {
            if (currentTab < 2) currentTab = 2; // Restrict Shop to Steps 2–11
            if (currentTab > 11) currentTab = 11; // Shop's last step is Step 11
        }

        if (userType === "company") {
            if (currentTab < 2) currentTab = 2; // Restrict Company to Steps 2–16
            if (currentTab > 16) currentTab = 16; // Company's last step is Step 16
        }

        // Determine if the next step should be the Result Step (Step 17)
        let isResultStep = false;
        if (
            (userType === "customer" && currentTab === 6 && n === 1) ||
            (userType === "shop" && currentTab === 11 && n === 1) ||
            (userType === "company" && currentTab === 16 && n === 1)
        ) {
            isResultStep = true;
            currentTab = 16; // Zero-based index for Step 17
        }

        if (isResultStep) {
            // Show the Result tab
            showTab(currentTab);

            // Calculate and display the result
            calculateResult();

            return; // Stop further navigation
        }

        // Show the determined tab
        showTab(currentTab);
    }

    // Function to handle the back button returning to Step 1
    function handleBackButton() {
        if (currentTab === 1 || currentTab === 6 || currentTab === 11) {
            currentTab = 0; // Go directly to Step 1
            showTab(currentTab); // Display Step 1
            return true; // Indicate that the back button redirected to Step 1
        }
        return false; // Indicate normal back button behavior
    }

    function showTab(n) {
        var x = document.getElementsByClassName("multisteps_form_panel");
        var totalSteps = x.length;
    
        // Hide all tabs by default
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    
        // Show the current tab
        x[n].style.display = "block";
    
        // Adjust button visibility based on the current step
        if (n === 0) {
            // Hide Back button on the first step
            document.getElementById("prevBtn").style.display = "none";
        } else {
            // Show Back button on other steps
            document.getElementById("prevBtn").style.display = "inline";
        }
    
        // Check if the current step is the Result Step
        if (n === 16) { // Replace 16 with the correct index if different
            // Hide both Back and Next buttons on the Result Step
            document.getElementById("prevBtn").style.display = "none";
            document.getElementById("nextBtn").style.display = "none";
        } else {
            // Show Next button on all other steps
            document.getElementById("nextBtn").style.display = "inline";
    
        }
    
        fixStepIndicator(n);
    }
    
    function fixStepIndicator(n) {
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
    }

    // ================= Popup Logic ================= //
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const openPopup = document.getElementById("openPopup"); // Add open button

    if (closePopup && popup) {
        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
        // Open popup on open button click
        openPopup.addEventListener("click", function () {
        popup.style.display = "block";
        });
    }

    // Bind Next/Prev Buttons
    document.getElementById("nextBtn").addEventListener("click", function () {
        nextPrev(1);
    });

    document.getElementById("prevBtn").addEventListener("click", function () {
        nextPrev(-1);
    });

    // Optional: Hide validation message when a radio button is selected
    $('input[type="radio"]').change(function () {
        var stepIndex = $(this).attr('name').match(/\d+/)[0]; // Extract step number from name
        $('#validation-step' + stepIndex).hide();
        $('#step-' + stepIndex).removeClass('error');
    });
});
