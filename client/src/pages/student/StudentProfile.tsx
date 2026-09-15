import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { User, Mail, Shield, BookOpen, GraduationCap, AlertCircle, MapPin } from 'lucide-react';

const StudentProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch('/student/profile');
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>{error || 'Profile not found'}</p>
      </div>
    );
  }

  const sp = profile.studentProfile || {};

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Student Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your academic identity and account details.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-full p-1.5 shadow-md">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <div className="pb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${profile.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {profile.status} ACCOUNT
              </span>
            </div>
          </div>
          
          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" /> {profile.email}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Academic Information</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">USN / Roll Number</p>
                    <p className="text-sm font-bold text-gray-900">{sp.usn || 'Not provided'}</p>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Branch / Program</p>
                    <p className="text-sm font-bold text-gray-900">{sp.branch || 'Not provided'}</p>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Semester</p>
                    <p className="text-sm font-bold text-gray-900">{sp.semester ? `Semester ${sp.semester}` : 'Not provided'}</p>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Section</p>
                    <p className="text-sm font-bold text-gray-900">{sp.section || 'Not provided'}</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Account Settings</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  For security and compliance reasons, academic fields such as USN, Branch, and Semester are managed by the institution.
                </p>
                <button disabled className="px-4 py-2 bg-white text-gray-400 text-sm font-medium border border-gray-200 rounded cursor-not-allowed">
                  Edit Profile (Disabled)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
