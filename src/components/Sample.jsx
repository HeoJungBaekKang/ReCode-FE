import React, { useEffect, useState } from 'react';
import xml2js from 'xml2js'; // You might need to install xml2js via npm

function SeoulOpenDataAPI() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://openAPI.seoul.go.en:8088/686f656b5a6f726935315455424a67/xml/ListNewsEmploy/1/5';
      try {
        const response = await fetch(url);

        if (response.status === 200 || response.status === 201) {
          const textData = await response.text();
          xml2js.parseString(textData, (err, result) => {
            if (err) {
              throw err;
            }
            // Assuming the XML data is parsed into a JavaScript object
            setData(result);
          });
        }
      } catch (error) {
        console.error('Request failed', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Seoul Open Data Platform OpenAPI Sample (React)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Displaying the data */}
    </div>
  );
}

export default SeoulOpenDataAPI;