export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> AIComply provides compliance information
          and tools, not legal advice. This website and its assessment do not
          create an attorney-client relationship. Consult a qualified
          employment attorney for specific legal questions about your
          company&apos;s obligations under Illinois HB&nbsp;3773.
        </p>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AIComply
          </p>
          <a
            href="https://www.ilga.gov/legislation/BillStatus.asp?DocNum=3773&GAID=17&DocTypeID=HB&LegId=152813&SessionID=112"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            Read the full text of HB&nbsp;3773
          </a>
        </div>
      </div>
    </footer>
  );
}
