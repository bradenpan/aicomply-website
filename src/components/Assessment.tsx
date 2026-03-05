export function Assessment() {
  // REPLACE_TALLY_ID with the actual Tally form ID after creating the form
  const tallyFormId = "REPLACE_TALLY_ID";

  return (
    <section id="assessment" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Free Compliance Assessment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Answer 7 quick questions to see if your hiring tools trigger
            Illinois HB&nbsp;3773 disclosure requirements.
          </p>
        </div>
        <div className="mt-10 rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
          <iframe
            data-tally-src={`https://tally.so/embed/${tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1`}
            width="100%"
            height="700"
            frameBorder={0}
            title="AI Hiring Compliance Assessment"
          />
        </div>
        {/* Tally embed script — loads the form dynamically */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var d=document,w="https://tally.so/widgets/embed.js",
              v=function(){
                if(typeof Tally!=="undefined"){
                  Tally.loadEmbeds();
                }else{
                  d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e){
                    e.src=e.dataset.tallySrc;
                  });
                }
              };
              if(typeof Tally!=="undefined"){v();}
              else if(d.querySelector('script[src="'+w+'"]')==null){
                var s=d.createElement("script");s.src=w;s.onload=v;s.onerror=v;d.body.appendChild(s);
              }
            `,
          }}
        />
      </div>
    </section>
  );
}
