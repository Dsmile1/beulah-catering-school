import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BlogManagement from "./BlogManagement";

export default function AdminDashBoards() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [updatingEmail, setUpdatingEmail] = useState(false);

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function login(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);

    setLoading(false);
  }

     async function changeAdminEmail(event) {
     event.preventDefault();

     const requestedEmail = newAdminEmail.trim().toLowerCase();

    if (!requestedEmail) {
      setMessage("Please enter your new email address.");
      return;
    }

    if (requestedEmail === session?.user?.email?.toLowerCase()) {
      setMessage("This is already your current admin email.");
      return;
    }

      setUpdatingEmail(true);
      setMessage("");

     try {
       const { error } = await supabase.auth.updateUser({
       email: requestedEmail,
      });

      if (error) throw error;

     setMessage(
       "Email change requested successfully. Check your email inboxes for confirmation instructions from Supabase."
      );

       setNewAdminEmail("");
     } catch (error) {
       console.error("Admin email update failed:", error);
       setMessage(`Could not update admin email: ${error.message}`);
     } finally {
       setUpdatingEmail(false);
     }
  }

  async function loadSubmissions() {
    setLoading(true);
    setMessage("");

    try {
      const [postResult, commentResult, applicationResult, quoteResult] =
        await Promise.all([
          supabase
            .from("gallery_posts")
            .select(
              "id, author_name, title, description, image_url, created_at",
            )
            .eq("approved", false)
            .order("created_at", { ascending: false }),

          supabase
            .from("gallery_comments")
            .select("id, post_id, author_name, comment, created_at")
            .eq("approved", false)
            .order("created_at", { ascending: false }),

          supabase
            .from("admission_applications")
            .select(
              "id, full_name, email, phone, program, message, status, created_at",
            )
            .order("created_at", { ascending: false }),

          supabase
            .from("catering_quote_requests")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);

      if (postResult.error) throw postResult.error;
      if (commentResult.error) throw commentResult.error;
      if (applicationResult.error) throw applicationResult.error;
      if (quoteResult.error) throw quoteResult.error;
      
      console.log('Quote request query result:', quoteResult)
      console.log('Quote requests returned:', quoteResult.data?.length)

      const postsWithImages = await Promise.all(
        (postResult.data || []).map(async (post) => {
          const { data, error } = await supabase.storage
            .from("gallery-photos")
            .createSignedUrl(post.image_url, 3600);

          return {
            ...post,
            signedImageUrl: error ? null : data?.signedUrl,
          };
        }),
      );

      setPosts(postsWithImages);
      setComments(commentResult.data || []);
      setApplications(applicationResult.data || []);
      setQuoteRequests(quoteResult.data || []);
    } catch (error) {
      console.error("Could not load submissions:", error);
      setMessage(
        "Could not load submissions. Check your admin access and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateApplicationStatus(applicationId, newStatus) {
    setMessage("");

    const { error } = await supabase
      .from("admission_applications")
      .update({ status: newStatus })
      .eq("id", applicationId);

    if (error) {
      setMessage(`Could not update application: ${error.message}`);
      return;
    }

    setApplications((current) =>
      current.map((application) =>
        application.id === applicationId
          ? { ...application, status: newStatus }
          : application,
      ),
    );

    setMessage(`Application marked as ${newStatus}.`);
  }

  async function updateQuoteStatus(quoteId, newStatus) {
    setMessage("");

    const { error } = await supabase
      .from("catering_quote_requests")
      .update({ status: newStatus })
      .eq("id", quoteId);

    if (error) {
      console.error("Could not update quote status:", error);
      setMessage(`Could not update quote status: ${error.message}`);
      return;
    }

    setQuoteRequests((current) =>
      current.map((quote) =>
        quote.id === quoteId ? { ...quote, status: newStatus } : quote,
      ),
    );

    setMessage(`Catering quote marked as ${newStatus}.`);
  }

  useEffect(() => {
    if (session) loadSubmissions();
  }, [session]);

  async function approvePost(postId) {
    setMessage("");

    const { error } = await supabase
      .from("gallery_posts")
      .update({ approved: true })
      .eq("id", postId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== postId));
    setMessage("Photo approved successfully.");
  }

  async function rejectPost(post) {
    if (
      !window.confirm("Permanently reject and delete this photo submission?")
    ) {
      return;
    }

    setMessage("");

    const { error: fileError } = await supabase.storage
      .from("gallery-photos")
      .remove([post.image_url]);

    if (fileError) {
      setMessage(`Could not delete the photo file: ${fileError.message}`);
      return;
    }

    const { error } = await supabase
      .from("gallery_posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      setMessage(
        `Photo file deleted, but the submission could not be removed: ${error.message}`,
      );
      return;
    }

    setPosts((current) => current.filter((item) => item.id !== post.id));
    setMessage("Photo submission rejected and deleted.");
  }

  async function approveComment(commentId) {
    setMessage("");

    const { error } = await supabase
      .from("gallery_comments")
      .update({ approved: true })
      .eq("id", commentId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setComments((current) => current.filter((item) => item.id !== commentId));
    setMessage("Comment approved successfully.");
  }

  async function rejectComment(commentId) {
    if (!window.confirm("Permanently delete this comment?")) return;

    setMessage("");

    const { error } = await supabase
      .from("gallery_comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setComments((current) => current.filter((item) => item.id !== commentId));
    setMessage("Comment rejected and deleted.");
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
    else {
      setPosts([]);
      setComments([]);
      setApplications([]);
      setQuoteRequests([]);
      setMessage("");
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-blue-700">
          Checking admin session...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
        <form
          onSubmit={login}
          className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="text-center text-3xl font-bold text-blue-700">
            BCS Admin Login
          </h1>

          <p className="text-center text-sm text-gray-600">
            Sign in to manage gallery submissions.
          </p>

          <label className="block">
            <span className="mb-1 block font-medium">Admin email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </label>

          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">
              BCS Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage admission applications, gallery photos, and comments.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-gray-800 px-5 py-3 font-semibold text-white hover:bg-gray-700"
          >
            Logout
          </button>
        </header>

        <section className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-blue-800">
              Admin Account Settings
          </h2>

          <p className="mb-2 text-sm text-gray-600">
              Current login email:
          </p>

          <p className="mb-5 font-semibold text-gray-900">
               {session?.user?.email}
          </p>

          <form onSubmit={changeAdminEmail} className="max-w-lg space-y-4">
          <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
               New admin email
          </span>

          <input
               type="email"
               value={newAdminEmail}
               onChange={(event) => setNewAdminEmail(event.target.value)}
               placeholder="Enter your new admin email"
               required
               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
          </label>

          <button
               type="submit"
               disabled={updatingEmail}
               className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
               {updatingEmail ? "Updating email..." : "Change Admin Email"}
          </button>
        </form>

             <p className="mt-4 text-sm text-gray-500">
                You may need to confirm the email change through messages sent
                to your existing and new email addresses.
             </p>
      </section>

        {message && (
          <p
            role="status"
            className="mb-6 rounded-lg bg-white p-4 text-sm text-blue-800"
          >
            {message}
          </p>
        )}
        <section className="mb-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Admission Applications ({applications.length})
            </h2>

            <button
              onClick={loadSubmissions}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh applications"}
            </button>
          </div>

          {applications.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-gray-600">
              No admission applications yet.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {applications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-xl bg-white p-5 shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    {application.full_name}
                  </h3>

                  <p className="mt-2 text-gray-700">
                    <strong>Program:</strong> {application.program}
                  </p>

                  <p className="mt-1 break-words text-gray-700">
                    <strong>Email:</strong> {application.email}
                  </p>

                  <p className="mt-1 text-gray-700">
                    <strong>Phone:</strong> {application.phone}
                  </p>

                  {application.message && (
                    <p className="mt-3 whitespace-pre-wrap break-words text-gray-700">
                      <strong>Message:</strong> {application.message}
                    </p>
                  )}

                  <p className="mt-3 text-sm text-gray-500">
                    Submitted:{" "}
                    {new Date(application.created_at).toLocaleString()}
                  </p>

                  <p className="mt-3">
                    <strong>Status:</strong>{" "}
                    <span className="font-semibold capitalize">
                      {application.status}
                    </span>
                  </p>

                  {application.status === "pending" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "accepted")
                        }
                        className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "rejected")
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          updateApplicationStatus(application.id, "reviewed")
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                      >
                        Mark Reviewed
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Catering Quote Requests */}
        <section className="mb-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Catering Quote Requests ({quoteRequests.length})
            </h2>

            <button
              onClick={loadSubmissions}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh quote requests"}
            </button>
          </div>

          {quoteRequests.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-gray-600">
              No catering quote requests yet.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {quoteRequests.map((quote) => (
                <article
                  key={quote.id}
                  className="rounded-xl bg-white p-5 shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {quote.first_name} {quote.last_name}
                    </h3>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold capitalize text-yellow-800">
                      {quote.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 break-words text-gray-700">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${quote.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {quote.email}
                      </a>
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={`tel:${quote.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {quote.phone}
                      </a>
                    </p>

                    <p>
                      <strong>Event:</strong> {quote.event_type}
                    </p>

                    <p>
                      <strong>Event date:</strong> {quote.event_date}
                    </p>

                    <p>
                      <strong>Location:</strong> {quote.location}, {quote.state}
                    </p>

                    <p>
                      <strong>Estimated guests:</strong> {quote.guest_count}
                    </p>

                    <p>
                      <strong>Catering menu:</strong>{" "}
                      {quote.catering_category || "Not specified"}
                    </p>

                    <p>
                      <strong>Heard about us via:</strong>{" "}
                      {quote.referral_source}
                    </p>

                    {quote.message && (
                      <p className="whitespace-pre-wrap">
                        <strong>Additional information:</strong> {quote.message}
                      </p>
                    )}

                    <p className="pt-2 text-sm text-gray-500">
                      Submitted: {new Date(quote.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <label
                      htmlFor={`quote-status-${quote.id}`}
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Update request status
                    </label>

                    <select
                      id={`quote-status-${quote.id}`}
                      value={quote.status}
                      onChange={(event) =>
                        updateQuoteStatus(quote.id, event.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">
            Pending photos ({posts.length})
          </h2>
          <button
            onClick={loadSubmissions}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh submissions"}
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="mb-10 rounded-xl bg-white p-6 text-gray-600">
            No pending photo submissions.
          </p>
        ) : (
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="rounded-xl bg-white p-5 shadow">
                {post.signedImageUrl ? (
                  <img
                    src={post.signedImageUrl}
                    alt={post.title}
                    className="mb-4 h-64 w-full rounded-lg object-contain bg-gray-50"
                  />
                ) : (
                  <p className="mb-4 rounded-lg bg-gray-50 p-6 text-sm text-gray-500">
                    Image preview unavailable.
                  </p>
                )}

                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Submitted by {post.author_name}
                </p>
                <p className="mt-3 whitespace-pre-wrap break-words text-gray-700">
                  {post.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => approvePost(post.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectPost(post)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <h2 className="mb-4 text-2xl font-bold">
          Pending comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-gray-600">
            No pending comments.
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((item) => (
              <article key={item.id} className="rounded-xl bg-white p-5 shadow">
                <p className="font-bold">{item.author_name}</p>
                <p className="mt-2 whitespace-pre-wrap break-words text-gray-700">
                  {item.comment}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Post ID: {item.post_id}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => approveComment(item.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectComment(item.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        <BlogManagement />
      </div>
    </main>
  );
}
