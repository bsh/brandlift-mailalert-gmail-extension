InboxSDK.load("1", "your-InboxSDK-api-key").then(function(sdk) {

    sdk.Compose.registerComposeViewHandler(function(composeView) {

        composeView.on("recipientsChanged", function(event) {

            var fLenAdresses, fLenCompeting, i, j;
            var exludingCount = 0;
            var addressesDomains = [];
            var competingDomains = [
                "xy.com",
                "gmail.com",
                "yzx.com"
            ];

            var to = composeView.getToRecipients();
            Object.keys(to).map(function(objectKey, index) {
                var value = to[objectKey];
                var domain = value.emailAddress.replace(/.*@/, "");
                addressesDomains.push(domain);
            });

            var cc = composeView.getCcRecipients();
            Object.keys(cc).map(function(objectKey, index) {
                var value = cc[objectKey];
                var domain = value.emailAddress.replace(/.*@/, "");
                addressesDomains.push(domain);
            });

            var bcc = composeView.getBccRecipients();
            Object.keys(bcc).map(function(objectKey, index) {
                var value = bcc[objectKey];
                var domain = value.emailAddress.replace(/.*@/, "");
                addressesDomains.push(domain);
            });

            var addressesDomains = Array.from(new Set(addressesDomains));

            fLenAdresses = addressesDomains.length;
            fLenCompeting = competingDomains.length;

            for (i = 0; i < fLenAdresses; i += 1) {
                for (j = 0; j < fLenCompeting; j += 1) {
                    if (addressesDomains[i].indexOf(competingDomains[j]) > -1) exludingCount++;
                }
            }

            if (exludingCount > 1) {
                alert("Do not have multiple competing clients among the recipients.");
            }
        });

    });

});