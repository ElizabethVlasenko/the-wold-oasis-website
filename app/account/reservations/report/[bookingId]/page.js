import SubmitButton from "@/app/_components/SubmitButton";
import { createContactMessageAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";

export async function generateMetadata({ params }) {
  return { title: `Report reservation #${params.bookingId}` };
}

async function Page({ params }) {
  const session = await auth();

  const { bookingId } = params;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Report a problem for the booking #{bookingId}
      </h2>

      <form
        action={createContactMessageAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" name="bookingId" value={bookingId} />

        <div className="space-y-2">
          <label>Full name</label>
          <input
            required
            readonly="readonly"
            defaultValue={session.user.name}
            className="px-5 py-3 w-full shadow-sm rounded-sm  bg-gray-600 text-gray-400"
            name="fullName"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            required
            readonly="readonly"
            defaultValue={session.user.email}
            className="px-5 py-3 w-full shadow-sm rounded-sm  bg-gray-600 text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Subject</label>
          <select
            required
            name="subject"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="">Select subject...</option>
            <option value="booking-problem">Booking problem</option>
            <option value="stay-problem">Stay problem</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label>Message</label>
          <textarea
            name="message"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            rows={3}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton>Report problem</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default Page;
